import React from "react"
import styles from "./filterCriteria.module.scss"
import { Button, Form, FormGroup, Label, Input, FormText ,Container,Row,Col} from 'reactstrap';

function FilterCriteria({handleFilterOptionClick,filterData}) {

    return <div className={styles.filter}>
       <Container>
           <Row className={styles.filter_wrapper}>
            {filterData.map((item,i) => <Col   key={i}>
                <h5 className="filter_title">{item.title}</h5>
                <div className="filter_options">
                    {item.options.map((option) => <FormGroup check>
                        <Label check>
                            <Input type="checkbox" onClick={()=>handleFilterOptionClick({...option,title:item.title,parentId:item.id})} checked={option.isChecked}/>
                            {option.label}
                        </Label>
                    </FormGroup>)}
                </div>
            </Col>)}
            </Row>
            </Container>
    </div>

}

export default FilterCriteria