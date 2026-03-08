const BASE = "http://localhost:5000/api";

const req = async (method, url, body) => {
  const res = await fetch(`${BASE}${url}`, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

const crud = (path) => ({
  getAll:  ()        => req("GET",    `/${path}`),
  create:  (data)    => req("POST",   `/${path}`, data),
  update:  (id, data)=> req("PUT",    `/${path}/${id}`, data),
  remove:  (id)      => req("DELETE", `/${path}/${id}`),
});

export const horsesApi      = crud("horses");
export const ridersApi      = crud("riders");
export const eventsApi      = crud("events");
export const inventoryApi   = crud("inventory");
export const transactionsApi= crud("transactions");
export const employeesApi   = crud("employees");
export const vetRecordsApi  = crud("vetrecords");

export const settingsApi = {
  get:  ()     => req("GET", "/settings"),
  save: (data) => req("PUT", "/settings", data),
};
