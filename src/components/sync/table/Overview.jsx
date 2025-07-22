import React from 'react';
import {
  GridComponent,
  ColumnDirective,
  ColumnsDirective,
  Page,
  Inject,
  Filter,
  Group,
  Sort
} from '@syncfusion/ej2-react-grids';

import data from '../../../data/datasource.json';

const Overview = () => {
  return (
    <div>
      <GridComponent
        dataSource={data}
        allowPaging={true}
        pageSettings={{ pageSize: 6 }}
        allowFiltering={true}
        allowGrouping={true}
        allowSorting={true} // ✅ Enable sorting
      >
        <ColumnsDirective>
          <ColumnDirective field="ID" headerText="ID" textAlign="Right" width="100" />
          <ColumnDirective field="EPOS" headerText="EPOS" width="120" />
          <ColumnDirective field="Title" headerText="Title" width="200" />
          <ColumnDirective field="MPN" headerText="MPN" width="150" />
          <ColumnDirective field="Barcode" headerText="Barcode" width="150" />
          <ColumnDirective field="Colour" headerText="Colour" width="100" />
          <ColumnDirective field="Colours" headerText="Colour(s)" width="100" />
          <ColumnDirective field="Size" headerText="Size" width="100" />
          <ColumnDirective field="Sizes" headerText="Size(s)" width="100" />
          <ColumnDirective field="RRP" headerText="RRP" textAlign="Right" format="C2" width="100" />
          <ColumnDirective field="Promo" headerText="Promo" textAlign="Right" format="C2" width="100" />
          <ColumnDirective field="Stock" headerText="Stock" textAlign="Right" width="100" />
        </ColumnsDirective>

        {/* ✅ Inject Sort along with others */}
        <Inject services={[Page, Filter, Group, Sort]} />
      </GridComponent>
    </div>
  );
};

export default Overview;
