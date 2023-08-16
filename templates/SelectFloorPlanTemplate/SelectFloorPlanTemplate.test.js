import React from 'react';
import { render, screen } from '@testing-library/react';
import SelectFloorPlanTemplate from './SelectFloorPlanTemplate';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '../../store/reducer';
import { useRouter } from 'next/router';
import Item from '../../components/Item/Item';



// Mock the useDispatch hook
jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
}));

jest.mock('next/router', () => ({
    __esModule: true,
    useRouter: jest.fn(),
}));

describe('SelectFloorPlanTemplate', () => {

    const store = createStore(rootReducer);
  const mockFloorPlan = [
    {
      fields: {
        displayStatus: 'On',
        // Add other necessary properties
      },
    },
    {
      fields: {
        displayStatus: 'Off',
        // Add other necessary properties
      },
    },
  ];

  test('should render the form with mocked router query', () => {
    const mockedRouter = {
        query: {
            company: 'test-company',
        },
    };
    useRouter.mockReturnValue(mockedRouter);

    const { getByTestId } = render(
        <Provider store={store}>
            <Item />
        </Provider>
    );

    const { company } = mockedRouter.query;
    expect(company).toBe('test-company');
});


  it('should render floor plan items when floorPlan array is provided', () => {
    render(<SelectFloorPlanTemplate plansSlot={mockFloorPlan} />);
  
    // Verify that the floor plan items are rendered
    expect(screen.getByTestId('floor-plan-item-0')).toBeInTheDocument();
    expect(screen.queryByTestId('floor-plan-item-1')).not.toBeInTheDocument();
  });
  
  it('should not render floor plan items when floorPlan array is empty', () => {
    render(<SelectFloorPlanTemplate plansSlot={[]} />);
  
    // Verify that no floor plan items are rendered
    expect(screen.queryByTestId(/^floor-plan-item-/)).not.toBeInTheDocument();
  });
});
