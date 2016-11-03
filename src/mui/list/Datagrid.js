import React, { Component, PropTypes } from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import FlatButton from 'material-ui/FlatButton';
import ContentSort from 'material-ui/svg-icons/content/sort';
import title from '../../util/title';

class Datagrid extends Component {
    updateSort = (event) => {
        event.stopPropagation();
        this.props.setSort(event.currentTarget.dataset.sort);
    }

    render() {
        const { resource, children, ids, data, currentSort, basePath, updateSort } = this.props;
        return (
            <table>
                <thead>
                    <tr>
                        {React.Children.toArray(children).map(field => (
                            <TableHeaderColumn key={field.props.label || field.props.source || 'no-key'}>
                                {(field.props.label || field.props.source) &&
                                    <FlatButton
                                        labelPosition="before"
                                        onClick={this.updateSort}
                                        data-sort={field.props.source}
                                        label={title(field.props.label, field.props.source)}
                                        icon={field.props.source === currentSort.sort ? <ContentSort style={currentSort.order === 'ASC' ? { transform: 'rotate(180deg)' } : {}} /> : false}
                                    />
                                }
                            </TableHeaderColumn>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {ids.map(id => (
                        <tr key={id}>
                            {React.Children.toArray(children).map(field => (
                                <TableRowColumn key={`${id}-${field.props.source}`}>
                                    <field.type {...field.props} record={data[id]} basePath={basePath} resource={resource} />
                                </TableRowColumn>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }
}

Datagrid.propTypes = {
    ids: PropTypes.arrayOf(PropTypes.any).isRequired,
    resource: PropTypes.string,
    data: PropTypes.object.isRequired,
    currentSort: PropTypes.shape({
        sort: PropTypes.string,
        order: PropTypes.string,
    }),
    basePath: PropTypes.string,
    setSort: PropTypes.func,
};

Datagrid.defaultProps = {
    data: {},
    ids: [],
};

export default Datagrid;
