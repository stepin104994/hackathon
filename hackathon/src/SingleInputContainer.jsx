import axios, { Axios } from "axios";
import React, { useEffect, useState } from "react"
import { Button, Form } from 'react-bootstrap';

const SingleInputContainer = () => {
    const [mockDataDetails, setMockDataDetails] = useState([]);
    const [columnName, setColumnName] = useState('');
    const [dataType, setDataType] = useState('String');
    const [minValue, setMinValue] = useState("0");
    const [maxValue, setMaxValue] = useState("5");
    const [render, setRender] = useState(true);
    const [exists,setExists] = useState(false);
    const onChange = (e, id) => {
        const { name, value } = e.target
        // console.log("e-->",name,"---",value);
        const editedData = mockDataDetails.map((item) =>
            item.id === id && name ? { ...item, [name]: value } : item
        )

        setMockDataDetails(editedData)
    }

    const handleClick = () => {
        mockDataDetails.push({
            id: Math.floor(Math.random() * (9999 - 100 + 1) + 1000),
            columnName: columnName,
            dataType: dataType,
            minValue: minValue,
            maxValue: maxValue
        })
        setMockDataDetails(mockDataDetails)
        setColumnName('');
        setDataType('');
        setMinValue('');
        setMaxValue('');
        setRender(!render)
    }
    useEffect(() => { }, [mockDataDetails, render])
    const generateData = () => {
        // const method = 'POST';
        // const url = 'https://localhost:7248/GetMockData';
        // axios
        //     .request({
        //         url,
        //         POST,
        //         responseType: 'blob', //important
        //     })
        const result = axios.post('https://localhost:7248/GetMockData', {
            body: mockDataDetails,
            responseType: 'blob'
        })
            .then(({ data }) => {
                const downloadUrl = window.URL.createObjectURL(new Blob([data]));
                const link = document.createElement('a');
                link.href = downloadUrl;
                link.setAttribute('download', 'file.xlsx');
                document.body.appendChild(link);
                link.click();
                link.remove();
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    const onColumnNameChange = (e) => {
        // console.log("e-->",name,"---",value);
        mockDataDetails.map((item) =>
            item.columnName === e  ? setExists(true) : setExists(false)
        )
console.log("e-->",exists);
        setColumnName(e);
    }
    return (
        <div className="container">
            <h1 className="title">Mock Data Generator</h1>
            <br /><br />
            <div className="form-group row">
                <div className="form-outline w-25">
                    <label className="form-label  fw-bold"  >Column Name</label>
                    <input type="text" required value={columnName} onChange={(e) => onColumnNameChange(e.target.value)} className="form-control" />
                </div>
                <div className="form-outline w-25">
                    <label className="form-label fw-bold" >Select Data Type</label>
                    <select className="form-select mt-0" value={dataType} onChange={(e) => setDataType(e.target.value)}>
                        <option>String</option>
                        <option>Number</option>
                        <option>Decimal</option>
                        <option>Date</option>
                    </select>
                </div>
                {dataType !== 'Date' ?
                    <>
                        <div className="form-outline w-25">
                            <label className="form-label fw-bold" >Give Min Range</label>
                            <input type="number" value={Number(minValue)} onChange={(e) => setMinValue(e.target.value)} className="form-control" />
                        </div>
                        <div className="form-outline w-25">
                            <label className="form-label fw-bold" >Give Max Range</label>
                            <input type="number" value={Number(maxValue)} onChange={(e) => setMaxValue(e.target.value)} className="form-control" />
                        </div>
                    </> :
                    <> <div className="form-outline w-25">
                        <Form.Group controlId="dob">
                            <label className="form-label fw-bold" >Give Min Range</label>
                            <Form.Control type="date" name="dob" value={minValue} placeholder="Date" onChange={(e) => setMinValue(e.target.value)} />
                        </Form.Group>
                    </div>
                        <div className="form-outline w-25">
                            <Form.Group controlId="dob">
                                <label className="form-label fw-bold" >Give Max Range</label>
                                <Form.Control type="date" value={maxValue} onChange={(e) => setMaxValue(e.target.value)} name="dob" placeholder="Date" />
                            </Form.Group>
                        </div>
                    </>}
            </div>
            <br /><br />
            <div className="form-outline w-25">
            <a href="#" data-toggle="tooltip" data-placement="bottom" title={columnName ? exists?"Column name already exists":'' : "Please add atleast 1 column"}> <button type="button" disabled={columnName ?exists?true: false : true} onClick={handleClick} className="btn btn-primary" >Add the column</button></a>
               
            </div>
            <br /><br />
            {/* <>{console.log(mockDataDetails)}</> */}
            {
                mockDataDetails.length!==0 &&
                <div className="card">
                    <div className="table-responsive">
                        <table className="table table-borderless">
                            <thead>
                                <tr>
                                    <th>Column Name</th>
                                    <th>Data Type</th>
                                    <th>Min Range</th>
                                    <th>Max Range</th>
                                </tr>
                            </thead>
                            <tbody>
                                {mockDataDetails?.map(({ id, columnName, dataType, minValue, maxValue }) => (
                                    <tr key={id}>
                                        <td>
                                            <div className="form-outline">
                                                <input name="columnName" type="text" value={columnName} onChange={(e) => onChange(e, id)} className="form-control" />
                                            </div>
                                        </td>
                                        <td>
                                            <div className="form-outline">
                                                <select name="dataType" className="form-select mt-0" value={dataType} onChange={(e) => onChange(e, id)}>
                                                    <option>String</option>
                                                    <option>Number</option>
                                                    <option>Decimal</option>
                                                    <option>Date</option>
                                                </select>
                                            </div>
                                        </td>
                                        <td>
                                            {
                                                dataType === "Date" ?
                                                    <div className="form-outline">
                                                        <Form.Group controlId="dob">
                                                            <Form.Control name="minValue" value={minValue} type="date" placeholder="Date" onChange={(e) => onChange(e, id)} />
                                                        </Form.Group>
                                                    </div> :
                                                    <div className="form-outline">
                                                        <input name="minValue" type="number" value={Number(minValue)} onChange={(e) => onChange(e, id)} className="form-control" />
                                                    </div>
                                            }
                                        </td>
                                        <td>
                                            {
                                                dataType === "Date" ?
                                                    <div className="form-outline">
                                                        <Form.Group controlId="dob">
                                                            <Form.Control name="maxValue" value={maxValue} type="date" placeholder="Date" onChange={(e) => onChange(e, id)} />
                                                        </Form.Group>
                                                    </div> :
                                                    <div className="form-outline">
                                                        <input name="maxValue" type="number" value={Number(maxValue)} onChange={(e) => onChange(e, id)} className="form-control" />
                                                    </div>
                                            }
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                       
                    </div>
                </div>
            }
            { mockDataDetails.length!==0 && <Button onClick={generateData}>Generate Data</Button>}
             
        </div>
    )
}

export default SingleInputContainer;