import { useMemo } from 'react';
import type { Activity } from '../types';
import CalorieDisplay from './CalorieDisplay';

type CalorieTrackerProps = {
	activities: Activity[];
};

export default function ({ activities }: CalorieTrackerProps) {
	// Calculate the total calories
	const caloriesConsumed = useMemo(
		() =>
			activities.reduce(
				(total, activity) =>
					activity.category === 1 ? total + activity.calories : total,
				0
			),
		[activities]
	);
	const caloriesBournd = useMemo(
		() =>
			activities.reduce(
				(total, activity) =>
					activity.category === 2 ? total + activity.calories : total,
				0
			),
		[activities]
	);
	return (
		<>
			<h2 className='text-4xl font-black text-white text-center'>Resumen de Caloria</h2>
			<div className='flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10  '>
				<CalorieDisplay
					calories={caloriesConsumed}
					text='Calorias Consumidas'
				/>

				<CalorieDisplay
					calories={caloriesBournd}
					text='Calorias Quemadas'
				/>
				<CalorieDisplay
					calories={caloriesConsumed - caloriesBournd}
					text='Diferencia'
				/>
			</div>
		</>
	);
}
