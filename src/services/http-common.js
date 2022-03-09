import axios from "axios";

const token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzIiwiaWF0IjoxNjQ1NjIxNDM1LCJleHAiOjE2NDYyMjYyMzV9.m0HE8-N3qSNsLX4XvD2i2ejVeAS4UgRfw35nwj49oBQUXuratJD6_442u3kcVwE8b4_oR-JmOTtxPvubo8lHtw"

export default axios.create({
  baseURL: "https://www.analyticsapp.xyz/api",
  headers: {
    "Content-type": "application/json",
    "Authorization" : `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzIiwiaWF0IjoxNjQ1NjI1MDA4LCJleHAiOjE2NDYyMjk4MDh9.9j_yu7vX1SCdoqTDBvp_227pLEIperQJaxU5OnAAeaMScB_-z6vOJ1q4iI8_NmS80eKoaZWGnNgqIsLp21PPtA`
  }
});