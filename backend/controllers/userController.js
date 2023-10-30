const { User, validate } = require("../models/UserSchema");
const bcrypt = require("bcrypt");

exports.signUpUserController = async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await User.findOne({ email: req.body.email });
		if (user)
			return res
				.status(409)
				.send({ message: "User with given email already Exist!" });

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		await new User({ ...req.body, password: hashPassword }).save();
		res.status(201).send({ message: "User created successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
};

exports.getUserDataState = async (req, res) => {
	try {
		const user = await User.findOne({ _id: req.query.userId });
	  if (user) {
		// User found, send the user data in the response
		const userData = {
			userId: user._id,
			firstName: user.firstName,
			lastName: user.lastName,
			avatar: user.avatar,			// Другие данные, которые вы хотите добавить
		};
		res.status(200).json({ userData }); // Assuming you want to send the user data as JSON
	  } else {
		// User not found, send a 404 Not Found response
		res.status(404).json({ message: "User not found" });
	  }
	} catch (error) {
	  // Handle any errors that occur during the query
	  console.error("Error retrieving user:", error);
	  res.status(500).json({ message: "Internal Server Error" });
	}
  };