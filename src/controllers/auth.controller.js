const supabase = require("../config/supabase");
const { successResponse, errorResponse } = require("../utils/response.util");
const bcrypt = require("bcrypt");

exports.signupLeader = async (req, res) => {
  try {
    const { name, email, password, college, programme, city } = req.body;

    if (!name || !email || !password || !college || !programme || !city) {
      return errorResponse(res, "All fields are required", 400);
    }

    // Check if email already exists
    const { data: existing, error: checkError } = await supabase
      .from("team_leaders")
      .select("id")
      .eq("email", email)
      .single();

    if (existing) {
      return errorResponse(res, "Email already registered", 400);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const { data, error } = await supabase.from("team_leaders").insert([
      {
        name,
        email,
        password: hashedPassword,
        college,
        programme,
        city
      }
    ]);

    if (error) {
      console.log("SUPABASE ERROR:", error);
      return errorResponse(res, error.message);
    }

    return successResponse(res, "Leader registered successfully", data);
  } catch (err) {
    console.error(err);
    return errorResponse(res, "Server error");
  }
};
