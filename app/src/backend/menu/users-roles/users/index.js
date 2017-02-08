import React, { Component } from 'react';
import DataTable, { TableHeader } from 'react-mdl/lib/DataTable';

import IconButton from 'react-mdl/lib/IconButton';
import Menu, { MenuItem } from 'react-mdl/lib/Menu';

const UsersPage = () => {
    return (
        <div className="users-page">
            <DataTable
                shadow={0}
                rows={[
                    {
                    material: 'Acrylic (Transparent)', quantity: 25, price: 2.90,
                    actions:<div style={{position: 'relative'}}>
                                <IconButton name="more_vert" id="demo-menu-lower-left" />
                                <Menu target="demo-menu-lower-left" align="right">
                                    <MenuItem>Views</MenuItem>
                                    <MenuItem>Update</MenuItem>
                                    <MenuItem>Delete</MenuItem>
                                </Menu>
                            </div>

                    },
                ]}
                className="wide"
            >

                <TableHeader name="material" tooltip="The amazing material name">Material</TableHeader>
                <TableHeader numeric name="quantity" tooltip="Number of materials">Quantity</TableHeader>
                <TableHeader numeric name="price" cellFormatter={(price) => `\$${price.toFixed(2)}`} tooltip="Price pet unit">Price</TableHeader>
                <TableHeader name="actions"></TableHeader>
            </DataTable>
        </div>
    );
};

export default UsersPage;