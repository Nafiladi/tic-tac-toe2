// loadtest.js
import http from 'k6/http';
import { sleep } from 'k6';
import { check } from "k6";

export let options = {
  vus: 100, // Virtual users
  duration: '30s',
};

export default function () {
  let res = http.get('http://localhost:3000');
  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(1);
}
