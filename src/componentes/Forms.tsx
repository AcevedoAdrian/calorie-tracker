import { categories } from '../db/categories';

export default function Form() {
	return (
		<form className='space-y-5 bg-white shadow p-10 rounded-lg'>
			<div className='grid grid-cols-1 gap-3'>
				<label
					htmlFor='category'
					className='font-bold'>
					Categoria:
				</label>
				<select
					id='category'
					className='border border-salate-300 p-2 rounded-lg w-full bg-white'>
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
					htmlFor='activity'
					className='font-bold'>
					Actividad:
				</label>
				<input
					id='activity'
					type='text'
					className='border border-salate-300 p-2 rounded-lg w-full bg-white'
					placeholder='Ejemplo: Correr, Caminar, etc.'
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
				/>
			</div>
			<input
				type='submit'
				className='bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer'
			/>
		</form>
	);
}
