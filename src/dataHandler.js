const users = {};

function get404(req, res) {
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.write(JSON.stringify({
    id: 'notFound',
    message: 'The page you are looking for was not found.',
  }));
  res.end();
}

function getUsers(res) {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.write(JSON.stringify(users));
  res.end();
}

function addUser(req, res) {
  const { name, age } = req.body;
  if (!name || !age) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify({
      message: 'Name and age are both required',
      id: 'addUserMissingParams',
    }));
  } else if (users[name]) {
    users[name].age = age;
    res.writeHead(204, { 'Content-Type': 'application/json' });
    res.write('');
  } else {
    users[name] = req.body;
    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify({
      message: 'Created Successfully',
    }));
  }
  res.end();
}

module.exports = {
  get404,
  getUsers,
  addUser,
};
