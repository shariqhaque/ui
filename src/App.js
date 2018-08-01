import './App.css'

import React, {Component} from 'react';
import {
  Heading,
  Table,
  TableHead,
  TextTableHeaderCell,
  TableBody,
  TableRow,
  TextTableCell,
  Button,
  Dialog,
  Label,
  TextInput
} from 'evergreen-ui';
import * as apis from './apiClient';

class App extends Component {

  state = {
    cars: [],
    dialogOpen: false,
    engine: '',
    xLocation: '',
    yLocation: ''
  }

  componentDidMount() {
    this.init()
  }

  init = () => {
    apis.getCars().then(cars => {
      console.log(cars);
      this.setState({
        cars
      })
    });
  }

  openDialog = () => {
    this.setState({
      dialogOpen: true
    })
  };

  closeDialog = () => {
    this.setState({
      dialogOpen: false
    })
  };

  addCar = () => {
    const { engine, xLocation, yLocation } = this.state;
    apis.addCar({
      engine,
      location: {
        xcordinate: xLocation,
        ycordinate: yLocation
      }
    }).then(() => {
      this.init();
      this.closeDialog();
    })

  };

  render() {

    const { cars, dialogOpen, engine, xLocation, yLocation } = this.state;

    return <div className="App">

      <Dialog
        isShown={dialogOpen}
        title="Add new Car"
        onCloseComplete={this.closeDialog}
        confirmLabel="Add"
        onConfirm={this.addCar}
      >
        <div className="formGroup">
          <Label htmlFor={32} size={400} marginRight={10}>
            Car Engine
          </Label>
          <TextInput
            value={engine}
            name={"engine"}
            onChange={(e) => this.setState({ engine: e.target.value }) }
            id={1}
            placeholder="Engine"
          />
        </div>
        <div className="formGroup">
          <Label htmlFor={32} size={400} marginRight={10}>
            Location(x)
          </Label>
          <TextInput
            value={xLocation}
            name={"locationx"}
            onChange={(e) => this.setState({ xLocation: e.target.value }) }
            id={2}
            placeholder="Location(x)"
          />
        </div>
        <div className="formGroup">
          <Label htmlFor={32} size={400} marginRight={10}>
              Location(y)
          </Label>
          <TextInput
            value={yLocation}
            name={"locationy"}
            onChange={(e) => this.setState({ yLocation: e.target.value }) }
            id={2}
            placeholder="Location(y)"
          />
        </div>
      </Dialog>

      <Heading size={900}>Dashboard</Heading>
      <div>
        <Button marginTop={20} appearance="blue" onClick={this.openDialog}>Add Car</Button>
      </div>
      <div className="dashbaordTable" >
        <Table>
          <TableHead>
            <TextTableHeaderCell>
              Car Identifier
            </TextTableHeaderCell>
            <TextTableHeaderCell>
              Engine
            </TextTableHeaderCell>
            <TextTableHeaderCell>
              Location
            </TextTableHeaderCell>
          </TableHead>
          <TableBody height={240}>
            {cars.map(car => (
              <TableRow key={car.id} isSelectable>
                <TextTableCell>{car.id}</TextTableCell>
                <TextTableCell>{car.engine}</TextTableCell>
                <TextTableCell>
                  {JSON.stringify(car.location, null, 4)}
                </TextTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  }
}

export default App
