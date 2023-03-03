const Posts = ({ users }) => {
	console.log(users)

	return (
		<div className="py-20">
			<a href={"/user?id=" + users.id}>
				<div className="flex flex-row justify-around text-center border rounded-xl sm w-4/5 m-auto py-10 mb-4" >
					<div className="text-left">
						<h3 className="text-mint">{users.title}</h3>
						<p>Triotel</p>
					</div>

					<div>
						<h3 className="text-coolGray-normal">Lokacija</h3>
						<p>{users.city}</p>
					</div>

					<div>
						<h3 className="text-coolGray-normal">Aražman</h3>
						<p>{users.type.charAt(0).toUpperCase() + users.type.slice(1)}</p>
					</div>

					<div>
						<h3 className="text-coolGray-normal">Datum objave</h3>
						<p>{`${users.date.toLocaleTimeString("en-US")} ${users.date.getMonth()} ${users.date.getYear()}`}</p>
					</div>
				</div>
			</a>

			<a href={"/user?id=" + users.id}>
				<div className="flex flex-row justify-around text-center border rounded-xl sm w-4/5 m-auto py-10 mb-4" >
					<div className="text-left">
						<h3 className="text-mint">{users.title}</h3>
						<p>Triotel</p>
					</div>

					<div>
						<h3 className="text-coolGray-normal">Lokacija</h3>
						<p>{users.city}</p>
					</div>

					<div>
						<h3 className="text-coolGray-normal">Aražman</h3>
						<p>{users.type.charAt(0).toUpperCase() + users.type.slice(1)}</p>
					</div>

					<div>
						<h3 className="text-coolGray-normal">Datum objave</h3>
						<p>{`${users.date.toLocaleTimeString("en-US")} ${users.date.getMonth()} ${users.date.getYear()}`}</p>
					</div>
				</div>
			</a>
		</div>
	)
}
export default Posts