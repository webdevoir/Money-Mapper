import { Actions, ActionConst } from 'react-native-router-flux';
import axios from 'axios';
import baseurl from '../url';
import { GET_EXPENSES } from '../actions/types';

// action dispatched when user clicks Done button on Add New Subcategory page
export const addNewSubcategory = (token, categoryName, subcategory, amount) => {

    return (dispatch) => {
        const axiosData = {
            token: token,
            categoryName: categoryName,
            subcategory: subcategory,
            amount: amount
        };

        const endpoint = baseurl + '/api/addnewsubcategory';

        axios.post(endpoint, axiosData)
            .then(response => {
                // After everything is successful re-route the user to the settings page
                getExpenseData(dispatch, token);
                // Actions.pop({ type: ActionConst.REFRESH });
            })
            .catch(err => {
                console.log('error: ', err);
            });
    };
};

const getExpenseData = (dispatch, token) => {

        const axiosData = {
            token: token,
            timeFrame: "thismonth"
        };
        const endpoint = baseurl + "/api/expenses2";
        axios.post(endpoint, axiosData)
            .then(response => {
                dispatch({
                    type: GET_EXPENSES,
                    payload: response.data
                });
                Actions.pop({ type: ActionConst.REFRESH });
        })
        .catch(err => {
            console.log('error retrieving expenses: ', err);
        });
};
