import React, { useEffect, useState } from "react";
import { Table, Spinner } from "reactstrap";
import { Link } from "react-router-dom";
import config from '../utils/utils';

const List = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { HOST } = config;
  useEffect(() => {
    fetch(`${HOST}expenses/`)
      .then(response => response.json())
      .then(result => {
        const { data } = result;
        setLoading(true);
        setData(data);
        console.log(data);
      });
  }, []);

  return (
    <>
      {
        !loading &&
        <Spinner />
      }
      {
        loading && data && data.length > 0 &&
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Date</th>
              <th>Description</th>
              <th>Income/Expense</th>
              <th>Amount</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {
            data.map((item, index) => { 
              return (<tr key={item._id}>
              <td scope="row">{index}</td>
              <td>22-02-16</td>
              <td>{item.description}</td>
              <td>{item.mode}</td>
              <td>{item.amount}</td>
              <td>
                <Link to={`/edit/${item._id}`}>
                  <i className="fa fa-pencil-square-o" aria-hidden="true" />
                </Link>
              </td>
              <td>
                <span id={item._id}>
                  <i className="fa fa-trash" aria-hidden="true" />
                </span>
              </td>
              </tr>)      
            })
          }
          </tbody>
        </Table>
      }
    </>
  );
};

export default List;
