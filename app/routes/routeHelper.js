import BudgetPage from '../pages/budgetPage';
import NotesPage from '../pages/notesPage';
import SchedulerPage from '../pages/schedulerPage';

export const routes = {
    budget: {
        address: '/budget',
        name: 'Budget Helper',
        page: BudgetPage
    },
    index: {
        address: '/'
    },
    notes: {
        address: '/notes',
        name: 'Notes Tracker',
        page: NotesPage
    },
    scheduler: {
        address: '/scheduler',
        name: 'To-Do Scheduler',
        page: SchedulerPage
    }
}