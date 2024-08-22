import { useState, ChangeEvent, FormEvent, Dispatch } from 'react';
import { categories } from '../db/categories';
import type { Activity } from '../types';
import { ActivityActions } from '../reducer/activityReducer';

type FormProps = {
	dispatch: Dispatch<ActivityActions>;
};

const initialState = {
	id: Math.random().toString(36).substring(7),
	category: 1,
	nameActivity: '',
	calories: 0,
};

export default function Form({ dispatch }: FormProps) {
	const [activity, setActivity] = useState<Activity>(initialState);

	const handleChange = (
		event: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>
	) => {
		const isNumberFiel = ['category', 'calories'].includes(event.target.id);
		setActivity({
			...activity,
			[event.target.id]: isNumberFiel ? Number(event.target.value) : event.target.value,
		});
	};

	const isValidActivity = () => {
		const { nameActivity, calories } = activity;
		return nameActivity.trim() !== '' && calories > 0;
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		dispatch({
			type: 'save-activity',
			payload: { newActivity: activity },
		});

		setActivity({
			...initialState,
			id: Math.random().toString(36).substring(7),
		});
	};

	return (
		<form
			className='space-y-5 bg-white shadow p-10 rounded-lg'
			onSubmit={handleSubmit}>
			<div className='grid grid-cols-1 gap-3'>
				<label
					htmlFor='category'
					className='font-bold'>
					Categoria:
				</label>
				<select
					id='category'
					className='border border-salate-300 p-2 rounded-lg w-full bg-white'
					onChange={handleChange}>
					{categories.map(category => (
						<option
							key={category.id}
							value={category.id}>
							{category.name}
						</option>
					))}
				</select>
			</div>
			<div className='grid grid-cols-1 gap-3'>
				<label
					htmlFor='nameActivity'
					className='font-bold'>
					Actividad:
				</label>
				<input
					id='nameActivity'
					type='text'
					className='border border-salate-300 p-2 rounded-lg w-full bg-white'
					placeholder='Ejemplo: Correr, Caminar, etc.'
					value={activity.nameActivity}
					onChange={handleChange}
				/>
			</div>
			<div className='grid grid-cols-1 gap-3'>
				<label
					htmlFor='calories'
					className='font-bold'>
					Calorias:
				</label>
				<input
					id='calories'
					type='number'
					className='border border-salate-300 p-2 rounded-lg w-full bg-white'
					placeholder='Ejemplo: 100 o 200'
					value={activity.calories}
					onChange={handleChange}
				/>
			</div>
			<input
				type='submit'
				className='bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer disabled:opacity-10'
				value={activity.category === 1 ? 'Guardar Comida' : 'Guardar Ejercicio'}
				disabled={!isValidActivity()}
			/>
		</form>
	);
}
