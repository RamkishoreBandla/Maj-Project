import React, { useState } from 'react';
import Criteria from './Criteria';
import { Button } from 'react-bootstrap';
import Results from './Results';

function DynamicInputFields() {
  const [inputs, setInputs] = useState([{ id: 1, value1: '', value2: '' }]);
  const [selectedOption, setSelectedOption] = useState(null); // for criteria
  const [firstNode, setFirstNode] = useState(null); //initial
  const [lastNode, setLastNode] = useState(null); //final
  const [finalResults, setFinalResults] = useState(null); //final results
  const handleAddInput = () => {
    const newInput = {
      id: inputs.length + 1,
      value1: '',
      value2: ''
    };
    setInputs([...inputs, newInput]);
  };

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newInputs = [...inputs];
    newInputs[index][name] = value;
    setInputs(newInputs);
  };

  const handleRemoveInput = (index) => {
    const newInputs = [...inputs];
    newInputs.splice(index, 1);
    setInputs(newInputs);
  };

  const handleSubmission = (e) => {

    console.log(inputs);
    console.log(selectedOption);
    console.log(firstNode, lastNode);
    let finalGraph=constructGraph(inputs);
    console.log(finalGraph);
  }

  const constructGraph=(inputs)=>{
    let graph={}
    for(let i of inputs){
      console.log(i);
      graph[i['value1']]=i['value2'].split(",").map(e=>e.trim());
    }
    return graph;
  }

  return (
    <>

      <div className='container mt-5'>

        {inputs.map((input, index) => (
          <div key={input.id} className='row'>
            <div className='col'>
              Enter Node:
              <input
                type="text"
                name="value1"
                value={input.value1}
                placeholder='eg: A'
                onChange={(e) => handleInputChange(index, e)}
              />
            </div>
            <div className='col'>
              Enter Neighbours
              <input
                type="text"
                name="value2"
                value={input.value2}
                placeholder='eg: B,C,D'
                onChange={(e) => handleInputChange(index, e)}
              />
            </div>
            <div className='col-md-2'>
              <button onClick={() => handleRemoveInput(index)}>Remove</button>

            </div>
          </div>
        ))}


        <div className='row mt-2'>
          <div className='col'>
            <button onClick={handleAddInput}>Add</button>
          </div>
        </div>

        <div className='row mt-2'>
          <div className='col'>
            <Criteria selectedOption={selectedOption} setSelectedOption={(val) => { setSelectedOption(val) }} />
          </div>

        </div>



        {selectedOption && selectedOption !== 'allep' ?
          <div className='row mt-2'>
            <div className='col'>
              Enter Initial node
              <input type='text' value={firstNode} onChange={(e) => { setFirstNode(e.target.value) }}></input>
            </div>
            <div className='col'>
              Enter Final Node
              <input type='text' value={lastNode} onChange={(e) => { setLastNode(e.target.value) }}></input>
            </div>
          </div>
          :
          null
        }



        <div className='row mt-2'>
          <div className='col'>
            <Button className='primary' onClick={(e) => { handleSubmission(e) }}>Submit</Button>
          </div>
        </div>
      </div >
      <div className='container mt-5'>
        <Results finalResults={finalResults} />
      </div>

    </>
  );
}

export default DynamicInputFields;
