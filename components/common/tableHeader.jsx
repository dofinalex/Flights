import { matchesProperty } from 'lodash';
import React, { Component } from 'react';
class TableHeader extends Component {
    state = {  } ;
    
    render() { 
        const {columns}=this.props
        return (
            <thead>
              <tr>
                {columns.map((c) => {
                  return (
                    <th className="clickable" key={c.key || c.path}>
                      {c.label}
                    </th>
                  );
                })}
                <th></th>
              </tr>
            </thead>
          );
        }
      }
      
 
export default TableHeader;