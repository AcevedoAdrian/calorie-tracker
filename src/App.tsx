import { useReducer, useEffect, useMemo } from 'react';
import { initialState, activityReducer } from './reducer/activityReducer';
import Form from './componentes/Forms';
import ActivityList from './componentes/ActivityList';
import CalorieTracker from './componentes/CalorieTracker';

function App() {
	const [state, dispatch] = useReducer(activityReducer, initialState);

	useEffect(() => {
		localStorage.setItem('activities', JSON.stringify(state.activities));
	}, [state.activities]);

	const disabledReset = useMemo(() => state.activities.length, [state.activities]);

	return (
		<>
			<header className='bg-lime-600 py-3'>
				<div className='max-w-4xl mx-auto flex justify-between items-center'>
					<h1 className='text-center text-lg font-bold text-white uppercases'>
						Contador de Calorias
					</h1>
					<button
						className='bg-white text-lime-600 hover:bg-lime-500 p-2 font-bold uppercase cursor-pointer text-sm rounded-lg disabled:opacity-50'
						disabled={!disabledReset}
						onClick={() => dispatch({ type: 'reset-activities' })}>
						Reiniciar App
					</button>
				</div>
			</header>
			<section className='bg-lime-500 py-20 px-5'>
				<div className='max-w-4xl mx-auto'>
					<Form
						dispatch={dispatch}
						state={state}
					/>
				</div>
			</section>

			<section className='bg-gray-800 py-10'>
				<div className='max-w-4xl mx-auto'>
					<CalorieTracker activities={state.activities} />
				</div>
			</section>
			<section className='p-10 mx-auto max-w-4xl'>
				<ActivityList
					activities={state.activities}
					dispatch={dispatch}
				/>
			</section>
		</>
	);
}

export default App;
