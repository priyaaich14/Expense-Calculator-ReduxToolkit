import CategoriesContainer from './CategoriesContainer'
import ExpensesContainer from './ExpensesContainer'
export default function App(){

    return (
        <div className='container'>
            <h2>Expense-Redux</h2>
            <CategoriesContainer/>
            <ExpensesContainer/>
        </div>
    )
}