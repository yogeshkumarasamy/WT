import React, { useEffect, useState } from "react";
import { Col, Row, Button, Form, FormGroup, Label, Input, Spinner } from "reactstrap";
import { useHistory } from 'react-router-dom';
import config from '../utils/utils';
import { TrackerContext } from "../store/tracker-context";

const AddEdit = ({ match }) => {
  const { HOST } = config;
  let history = useHistory();
  const addInitialState = {
    date: "2020-06-29",
    desc: "Income Salary",
    mode: "Income",
    amount: "30000",
    from: "add"
  };
  const stateDecider = match => {
    return match.path === "/add" || match.path === "/"
      ? addInitialState
      : { ...addInitialState, from: 'edit' };
  };
  const initState = stateDecider(match);
  const [data, setData] = useState(initState);
  const [loading, setLoading] = useState(true);
  const { date, desc, mode, amount, from } = data;
  useEffect(() => {
    if (from === 'edit') {
      fetch(`http://localhost:3000/expenses/${match.params.id}`)
        .then(response => response.json())
        .then(result => {

          setData({ ...data, mode: result.mode, amount: result.amount, id: result._id, desc: result.description });
          setLoading(false);
        });
    } else {
      setData(addInitialState);
      setLoading(false);
    }

  }, []);
  const submit = () => {
    if (from === 'edit') {
      fetch(`${HOST}expenses/${match.params.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify([
          { "propName": "description", "value": desc },
          { "propName": "mode", "value": mode },
          { "propName": "amount", "value": amount }
        ])
      }).then(response => response.json())
        .then(result => {
          console.log(result.successs);
          if (result.successs) {
            history.push('/list');
          }
        }
        )
        .catch(error => console.log(error));
    } else {
      fetch(`${HOST}expenses/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "date": date,
         "amount": amount,
         "description": desc,
         "mode": mode
        })
      }).then(response => response.json())
        .then(result => {
          console.log(result.successs);
          if (result.success) {
            history.push('/list');
          }
        }
        )
        .catch(error => console.log(error));
    }

  };



  // const { test } = useContext(TrackerContext);

  return (
    <Form>
      {loading &&
        <Spinner />
      }
      {
        !loading &&
        (<><Row form>
          <Col md={6}>
            <FormGroup>
              <Label for="date">DATE</Label>
              <Input
                type="date"
                name="date"
                id="date"
                defaultValue={date}
                onChange={() => { }}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="desc">DESCRIPTION</Label>
              <Input type="text" name="desc" id="desc" defaultValue={desc} />
            </FormGroup>
          </Col>
        </Row>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="mode">INCOME/EXPENSE</Label>
                <Input type="select" name="mode" id="mode" defaultValue={mode}>
                  <option>Income</option>
                  <option>Expense</option>
                </Input>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="amount">AMOUNT</Label>
                <Input
                  type="text"
                  name="amount"
                  id="amount"
                  defaultValue={amount}
                />
              </FormGroup>
            </Col>
          </Row>
          <Button onClick={() => { submit() }}>{from === 'add' ? 'Submit' : 'Update'}</Button>
        </>
        )
      }

    </Form>
  );
};

export default AddEdit;
