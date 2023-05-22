import React from 'react';
import styles from './SelectFloorPlanTemplate.module.scss';
import Item from '../../components/Item/Item';
import { Container, Row, Col } from 'reactstrap';


const SelectFloorPlanTemplate = ({ plansSlot }) => {

    const floorPlan = plansSlot?.filter((item) => {
        return item.fields.displayStatus === "On"
    })

    return (
        <div className={styles.SelectFloorPlanTemplate}>
            <div className={styles.SelectFloorPlanTemplate__innerContainer}>
                <Container >
                    <Row>
                        {
                            floorPlan && floorPlan?.map((data, i) => {
                                return (
                                    <Col xl='4' lg='6' md='6' sm='12' key={i}>
                                        <Item
                                            data={data.fields}
                                        />
                                    </Col>
                                )
                            })
                        }
                    </Row>
                </Container>
            </div>
        </div>
    );
};

export default SelectFloorPlanTemplate;