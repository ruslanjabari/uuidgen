const express = require("express");
const fs = require("fs");

function random() {
  // get ethernet, if not there, get loopback (for testing and local deployment)
  let getAddress = require("os").networkInterfaces()["eth0"];
  getAdress = getAddress ? getAddress[0].mac : null;
  const macAddress = getAddress
    ? getAddress
    : require("os").networkInterfaces()["lo0"][0].mac;
  // this would be different on each server, we can also use The-Time instead (injected by Nginx)
  const highResProcessTime = process.hrtime();
  let time = (
    highResProcessTime[0] * 1000000 +
    highResProcessTime[1] / 1000
  ).toString();
  time = time.replace(".", "");
  const seed = Math.abs(
    Math.sin(parseInt(macAddress.toString()) + parseInt(time)) *
      100000000000000 +
      Math.cos(parseInt(macAddress.toString()) + parseInt(time)) *
        100000000000000
  );
  let res = Math.floor(seed).toString(16);
  if (res.length < 12) {
    return random();
  }
  return res;
}

const server1 = express();
const server2 = express();
const port1 = 1001;
const port2 = 1002;

server1.listen(port1, () => console.log(`listening on ${port1}`));
server2.listen(port2, () => console.log(`listening on ${port2}`));

server1.get("/", (req, res) => {
  console.log("to 1 at", req.headers["the-time"]);
  res.redirect("http://localhost:3000");
});

server2.get("/", (req, res) => {
  res.redirect("http://localhost:3000");
});

server1.get("/gen", (req, res) => {
  let id = random();
  const data = JSON.stringify({ id: id, time_stamp: req.headers["the-time"] });
  fs.open("data.txt", "a", 666, (e, id) => {
    fs.write(id, `From 1: ${data}\n`, null, "utf8", () =>
      fs.close(id, () => {})
    );
  });
  res.send(id);
});
server2.get("/gen", (req, res) => {
  let id = random();
  const data = JSON.stringify({ id: id, time_stamp: req.headers["the-time"] });
  fs.open("data.txt", "a", 666, (e, id) => {
    fs.write(id, `From 2: ${data}\n`, null, "utf8", () =>
      fs.close(id, () => {})
    );
  });
  res.send(id);
});

server1.get("/flood", (req, res) => {
  const resLs = [];
  for (let i = 0; i < 250; i++) {
    let id = random();
    const data = JSON.stringify({
      from: 1,
      id: id,
      time_stamp: req.headers["the-time"],
    });
    fs.open("data.txt", "a", 666, (e, id) => {
      fs.write(id, `${data}\n`, null, "utf8", () => fs.close(id, () => {}));
    });
    resLs.push(data);
  }
  res.send(resLs);
});

server2.get("/flood", (req, res) => {
  const resLs = [];
  for (let i = 0; i < 250; i++) {
    let id = random();
    const data = JSON.stringify({
      from: 2,
      id: id,
      time_stamp: req.headers["the-time"],
    });
    fs.open("data.txt", "a", 666, (e, id) => {
      fs.write(id, `${data}\n`, null, "utf8", () => fs.close(id, () => {}));
    });
    resLs.push(data);
  }
  res.send(resLs);
});
