import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import HomeTemplate from './HomeTemplate';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '../../store/reducer';
import { useRouter } from 'next/router';
import Button from '../../components/UI/Button/Button';

jest.mock('../../../assets/img/icons/arrow.svg')

jest.mock('../../assets/img/homePage/bgHomePage.jpg')


jest.mock('next/router', () => ({
    __esModule: true,
    useRouter: jest.fn(),
}));

// Mock the useDispatch hook
jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
}));

describe('HomeTemplate', () => {

    let store;

    beforeEach(() => {
        // Create a mock store
        store = createStore(rootReducer);

        // Reset the mock functions before each test
        jest.clearAllMocks();
    });

    test('should render the form with mocked router query', () => {
        const mockedRouter = {
            query: {
                company: 'test-company',
            },
        };
        useRouter.mockReturnValue(mockedRouter);
    
        const { getByTestId } = render(
            <Provider store={store}>
                <HomeTemplate />
            </Provider>
        );
    
        const { company } = mockedRouter.query;
        expect(company).toBe('test-company');
    });
  


  test('calls handleGetOrderDetail when Get Order Detail button is clicked', () => {
    const mockHandleGetOrderDetail = jest.fn();

    const { queryByTestId } = render(<Button text="Get Order Detail" onclick={mockHandleGetOrderDetail} />);

    const orderButton = screen.getByRole('button', { name: /Get Order Detail/i })
    expect(orderButton).toBeInTheDocument()

    fireEvent.click(orderButton);
    expect(mockHandleGetOrderDetail).toHaveBeenCalled();
  });

  test('updates order ID state when input value changes', () => {
    render(<HomeTemplate />);
    const orderIDInput = screen.getByTestId('orderIDInput');
    const newOrderID = '123456';
    fireEvent.change(orderIDInput, { target: { value: newOrderID } });

    // Assert that the order ID state is updated
    expect(orderIDInput.value).toBe(newOrderID);
  });

//   test('dispatches setLot and floorplanAction when "Build Your Next Home" button is clicked', () => {
//     const mockSetLot = jest.fn();
//     const mockFloorplanAction = jest.fn();
//     // render(
//     //   <HomeTemplate
//     //     setLot={mockSetLot}
//     //     floorplanAction={mockFloorplanAction}
//     //   />
//     // );
//     // const buildButton = screen.getByTestId('buildButton');
//     // fireEvent.click(buildButton);

    
//     render(<Button text="Click here to build your next home"   setLot={mockSetLot}
//     floorplanAction={mockFloorplanAction}/>);

//     const buildButton= screen.getByRole('button', { name: /Click here to build your next homel/i })
//     expect(buildButton).toBeInTheDocument()

// `    // Assert that setLot and floorplanAction are dispatched`
//     expect(mockSetLot).toHaveBeenCalled();
//     expect(mockFloorplanAction).toHaveBeenCalled();
//   });

  test('redirects to select_floorplan page when "Build Your Next Home" button is clicked', () => {
    const mockRouter = {
        query: {
            company: 'test-company',
        },
        replace: jest.fn(),
    };
    useRouter.mockReturnValue(mockRouter);
    render(<Button text="Click here to build your next home" onclick={mockRouter.replace} />);
    const buildButton= screen.getByRole('button', { name: /Click here to build your next home/i })
    fireEvent.click(buildButton);
    expect(mockRouter.replace).toHaveBeenCalled()
  });

  test('displays the ordrerID', () => {
 
    render(<HomeTemplate />);
    const inputElement = screen.getByTestId('orderIDInput');
    fireEvent.change(inputElement, { target: { value: '12345' } });

    expect(inputElement.value).toBe('12345');
  });

  test('displays error toast when orderData.records is empty', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue({ records: [] }),
    });
    render(<HomeTemplate />);
    const getOrderDetailButton = screen.getByTestId('getOrderDetailButton');
    fireEvent.click(getOrderDetailButton);

    await screen.findByTestId('toastError');
    const errorToast = screen.getByTestId('toastError');
    expect(errorToast).toBeInTheDocument();
  });
});
