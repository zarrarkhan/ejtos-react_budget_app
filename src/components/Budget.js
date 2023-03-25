import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

const Budget = () => {
  const { budget, dispatch, currency, expenses } = useContext(AppContext);
  const [showError, setShowError] = useState(false);
  const [newBudget, setNewBudget] = useState(budget);
  const totalExpenses = expenses.reduce((total, item) => {
    return (total += item.cost);
  }, 0);

  const handleBudgetChange = (e) => {
    setNewBudget(e.target.value);
  };

  const handleBudgetBlur = () => {
    const budgetValue = Number(newBudget);
    if (budgetValue > 20000) {
      setShowError(true);
    } else if (budgetValue < totalExpenses) {
      setShowError(true);
    } else {
      dispatch({ type: 'SET_BUDGET', payload: budgetValue });
      setShowError(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.target.blur();
    }
  }

  const handleCloseError = () => setShowError(false);

  return (
    <>
      <div className='alert alert-secondary'>
        <span>Budget: {currency}
          <input type="number" value={newBudget} onChange={handleBudgetChange} onBlur={handleBudgetBlur} onKeyDown={handleKeyDown} step={10}/>
        </span>
      </div>
      <Modal show={showError} onHide={handleCloseError}>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {newBudget > 20000 && "The budget cannot be greater than $20,000"}
          {newBudget < totalExpenses && "You cannot reduce the budget value lower than spending"}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseError}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Budget;
