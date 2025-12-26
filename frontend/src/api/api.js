const BASE_URL = "http://localhost:5000";

// ================= AUTH =================

// login sa email i password
export const loginUser = async (email, password) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  // čuvamo token u localStorage ako postoji
  if (data.token) {
    localStorage.setItem("token", data.token);
  }

  return data;
};

// register sa username, email i password
export const registerUser = async (username, email, password) => {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }) // ⬅️ dodali username
  });

  const data = await res.json();

  // čuvamo token u localStorage ako postoji
  if (data.token) {
    localStorage.setItem("token", data.token);
  }

  return data;
};

// ================= QUIZ =================

// dobavljanje pitanja
export const getQuestions = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/questions/start`, {
    headers: { "Authorization": `Bearer ${token}` }
  });

  return res.json();
};

// slanje odgovora
export const submitQuiz = async (answers) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/questions/submit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ answers })
  });

  return res.json();
};

// ================= SCORES =================

export const getScoreboard = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/scores`, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });

 
  return res.json();
};



// ================= LOGOUT =================

export const logout = () => {
  localStorage.removeItem("token");
};
