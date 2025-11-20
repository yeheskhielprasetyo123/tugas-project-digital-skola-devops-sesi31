import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 10 },
    { duration: '1m', target: 10 },
    { duration: '30s', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<2000'],
    http_req_failed: ['rate<0.01'],
  },
};

export default function () {
  // Gunakan environment variable atau default localhost
  const baseUrl = __ENV.BASE_URL || 'http://localhost:3000';
  
  // Test GET request - get all notes
  const getResponse = http.get(`${baseUrl}/notes`);
  check(getResponse, {
    'GET /notes status is 200': (r) => r.status === 200,
  });
  
  // Test POST request - create new note
  const payload = JSON.stringify({
    title: `Test Note ${Date.now()}`,
    content: 'This is a test note from k6'
  });
  
  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  
  const postResponse = http.post(`${baseUrl}/notes`, payload, params);
  check(postResponse, {
    'POST /notes status is 201': (r) => r.status === 201,
  });
  
  sleep(1);
}
