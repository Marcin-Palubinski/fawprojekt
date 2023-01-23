const HelpPage = () => {
	return (
		<div className='min-h-sceen mx-auto max-w-screen-xl px-5'>
			<div className='flex flex-col items-center'>
				<h2 className='mt-5 text-5xl font-bold tracking-tight'>FAQ</h2>
				<p className='mt-3 text-xl text-neutral-400'>
					Często zadawane pytania
				</p>
			</div>
			<div className='divide-muted mx-auto mt-8 grid max-w-xl divide-y'>
				<div className='py-5'>
					<details className='group'>
						<summary className='flex cursor-pointer list-none items-center justify-between font-medium'>
							<span>Pytanie 1 ?</span>
							<span className='transition group-open:rotate-180'>
								<svg
									fill='none'
									height='24'
									stroke='currentColor'
									viewBox='0 0 24 24'
									width='24'
								>
									<path d='M6 9l6 6 6-6'></path>
								</svg>
							</span>
						</summary>
						<p className='group-open:animate-fadeIn mt-3 text-neutral-400'>
							Odpowiedź 1
						</p>
					</details>
				</div>
				<div className='py-5'>
					<details className='group'>
						<summary className='flex cursor-pointer list-none items-center justify-between font-medium'>
							<span>Pytanie 2 ?</span>
							<span className='transition group-open:rotate-180'>
								<svg
									fill='none'
									height='24'
									stroke='currentColor'
									viewBox='0 0 24 24'
									width='24'
								>
									<path d='M6 9l6 6 6-6'></path>
								</svg>
							</span>
						</summary>
						<p className='group-open:animate-fadeIn mt-3 text-neutral-400'>
							Odpowiedź 2
						</p>
					</details>
				</div>
			</div>
		</div>
	);
};

export default HelpPage;
