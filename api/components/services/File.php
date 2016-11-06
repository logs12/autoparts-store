<?php
namespace app\components\services;

use app\models\File as FileModel;
use yii;
use yii\web\UploadedFile;

class File extends BaseService
{
    public static $tempFile;

    public static function getFilesFolder()
    {
        return Yii::getAlias('@app/../app/files/');
    }

    public static function getFilePath(FileModel $file)
    {
        return '/files/' . $file->name . '.' . $file->extension;
    }

    public static function setGlobalFile($fileData, $fileName)
    {
        // Создание временного файла
        static::$tempFile = tmpfile();
        $tempFileInfo = stream_get_meta_data(static::$tempFile);
        fwrite(static::$tempFile, base64_decode($fileData['base64']));

        $_FILES[$fileName] = [
            'name' => $fileData['name'],
            'type' => $fileData['type'],
            'tmp_name' => $tempFileInfo['uri'],
            'size' => $fileData['size'],
            'error' => UPLOAD_ERR_OK,
        ];
    }

    /**
     * @param UploadedFile $uploadedFile
     * @return FileModel
     * @throws \Exception
     */
    public static function createFile(UploadedFile $uploadedFile)
    {
        $path = static::getFilesFolder();
        $uniqId = uniqid();
        $bytesWritten = 0;
        $fileModel = new FileModel();
        $transaction = Yii::$app->db->beginTransaction();
        try {
            $filePath = $path . $uniqId . '.' . $uploadedFile->extension;

            // Создание файла в БД
            $fileModel->setAttributes([
                'size' => $uploadedFile->size,
                'name' => $uniqId,
                'filename' => $uploadedFile->baseName,
                'extension' => $uploadedFile->extension,
            ]);
            $fileModel->saveOrError();

            copy($uploadedFile->tempName, $filePath);

//            $photo = new GD($path . $filePath);
//            $photo->setOptions(['jpegQuality' => 75]);
//
//            $photo->resize(600);
//            $photo->save($path . $file->getName() . '-wide.' . $file->getExtension());
//
//            $photo->resize(1500);
//            $photo->save($path . $file->getName() . '-normal.' . $file->getExtension());
//
//            $photo->adaptiveResize(300, 300);
//            $photo->save($path . $file->getName() . '-thumb.' . $file->getExtension());

            $transaction->commit();

        } catch (\Exception $exception) {
            $transaction->rollBack();
            if ($bytesWritten && isset($fileModel)) {
                static::deletePhoto($fileModel);
            }
            throw $exception;
        }

        return $fileModel;

    }

    public static function deletePhoto(FileModel $file)
    {
        $path = static::getFilesFolder();
        unlink($path . $file->name . '.' . $file->extension);
        unlink($path . $file->name . '-normal.' . $file->extension);
        unlink($path . $file->name . '-thumb.' . $file->extension);
        unlink($path . $file->name . '-wide.' . $file->extension);
    }
}
