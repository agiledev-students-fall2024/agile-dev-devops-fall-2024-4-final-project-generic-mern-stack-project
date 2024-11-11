import { expect } from 'chai';
import request from 'supertest';
import path from 'path';
import app from '../src/app.mjs';

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe("POST /api/upload-recipe-image", () => {
  it("should upload a single image file successfully", async () => {
    const res = await request(app)
      .post("/api/upload-recipe-image")
      .attach("my_files", path.join(__dirname, "test_image.jpg"));
      
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("status", "success");
    expect(res.body).to.have.property("message", "File uploaded successfully");
    expect(res.body.file).to.have.property("filename");
  });

  it("should return an error when no files are uploaded", async () => {
    const res = await request(app).post("/api/upload-recipe-image");
    
    expect(res.status).to.equal(400);
    expect(res.body).to.have.property("status", "error");
    expect(res.body).to.have.property("message", "No files uploaded");
  });

  it("should return an error when multiple files are uploaded", async () => {
    const res = await request(app)
      .post("/api/upload-recipe-image")
      .attach("my_files", path.join(__dirname, "test_image.jpg"))
      .attach("my_files", path.join(__dirname, "test_image2.jpg"));
      
    expect(res.status).to.equal(400);
    expect(res.body).to.have.property("status", "error");
    expect(res.body).to.have.property("message", "Too many files uploaded");
  });
});
