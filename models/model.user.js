class UserModel
{
	constructor(user_name, password)
	{
		this.user_name = user_name;
		this.password = password;
		this.token = null;

		this.counter = 0;
		this.nextCounter = 1;
	}
}

module.exports = UserModel;