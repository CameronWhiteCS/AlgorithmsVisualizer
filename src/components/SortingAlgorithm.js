import { useFormik } from 'formik';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';

import { getUnsortedList } from 'sortingAlgorithms';


/**
 * 
 * @param {*} props.value value of the number 
 */
const NumberColumn = (props) => {

    const style = {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        flexDirection: 'column',
        flexBasis: '100%',
        height: props.value * 5 + 40 + 'px',
        padding: '5px 0px 5px 0px',
        backgroundColor: '#5b91cd',
        border: props.showNumber ? '1px solid black' : 'none'
    };

    return (
        <div style={style}>
            {props.showNumber && props.value}
        </div>
    )
}

const buttonStyle = {
    width: '150px',
    marginRight: '10px'
}

/**
 * 
 * @param {Function} props.sort Function that takes an unsorted list as input and returns an arrary of increasingly sorted lists.
 * @param {String} props.name Name of the sorting algorithm
 */
const SortingAlgorithm = (props) => {

    const sort = () => {

        console.log(formik.values);

        let newIterations;

        if (iterations.length > 1) {
            setPage(0);
            newIterations = props.sort(getUnsortedList(formik.values.numElements), formik.values.ascending);
        } else {
            newIterations = props.sort(iterations[0], formik.values.ascending);
        }

        setIterations(newIterations);
        setAnimating(true);

        for (let i = 1; i < newIterations.length; i++) {
            setTimeout(() => {
                setPage(i);
            }, i * formik.values.animationDelay);
        }

        setTimeout(() => {
            setAnimating(false);
        }, newIterations.length * formik.values.animationDelay);
    }

    const formik = useFormik({
        initialValues: {
            animationDelay: 100,
            numElements: 40,
            ascending: true
        },
        onSubmit: sort
    })

    const [iterations, setIterations] = useState([getUnsortedList(formik.values.numElements)]);
    const [page, setPage] = useState(0);
    const [animating, setAnimating] = useState(false);

    const initialize = () => {
        setIterations([getUnsortedList(formik.values.numElements)]);
        setPage(0);
    }

    useEffect(() => {
        initialize();
    }, [formik.values.numElements]);

    return (
        <>
            <Form>
                <fieldset>
                    <legend>{props.name} Parameters</legend>
                    <Form.Group>
                        <Form.Label htmlFor="numElements">
                            Number of items to be sorted
                        </Form.Label>
                        <select name="numElements" defaultValue={40} onChange={formik.handleChange} className="form form-control">
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                            <option value="25">25</option>
                            <option value="30">30</option>
                            <option value="35">35</option>
                            <option value="40">40</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                            <option value="200">200</option>
                        </select>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="animationDelay">
                            Animation delay (ms)
                        </Form.Label>
                        <select name="animationDelay" defaultValue={100} onChange={formik.handleChange} className="form form-control">
                            <option value="0">0</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                            <option value="250">250</option>
                            <option value="500">500</option>
                            <option value="1000">1000</option>
                        </select>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="ascending">
                            Ascending order?
                        </Form.Label>
                        {/** TODO: Fix this terrible way of toggling the ascending/descending value. **/}
                        <select name="ascending" onChange={(e) => { formik.setFieldValue('ascending', !formik.values.ascending) }} className="form form-control">
                            <option value={"true"}>True</option>
                            <option value={"false"}>False</option>
                        </select>
                    </Form.Group>
                </fieldset>
            </Form>

            <br />

            <div style={{ display: 'flex', flexDirection: 'row' }}>

                <Button style={buttonStyle} disabled={animating} onClick={sort} variant="primary">
                    {iterations.length > 1 ? "Sort new list" : "Sort"}
                </Button>

                <Button style={buttonStyle} disabled={animating || page <= 0} onClick={() => { setPage(page - 1); }} variant="secondary">
                    Previous step
                </Button>

                <Button style={buttonStyle} disabled={animating || page >= iterations.length - 1} onClick={() => { setPage(page + 1); }} variant="secondary">
                    Next step
                </Button>

            </div>
            <hr />

            <p>
                Step: {page}
            </p>
            <div style={{ display: 'flex', alignItems: 'flex-end', minHeight: '540px', }}>
                {
                    iterations[page].map((element) => {
                        if (element !== null) {
                            return (
                                <NumberColumn key={Math.random()} value={element} showNumber={formik.values.numElements <= 20 ? true : false} />
                            );
                        }
                    })
                }
            </div>
            <br />


        </>

    );

}

export default SortingAlgorithm;