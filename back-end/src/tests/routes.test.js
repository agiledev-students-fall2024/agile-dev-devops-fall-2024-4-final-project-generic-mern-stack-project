const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const fs = require('fs').promises;
const path = require('path');
const app = require('../app');

chai.use(chaiHttp);
const { expect } = chai;

describe('Routes Tests', () => {
  let fsReadStub;
  let fsWriteStub;
  let fsMkdirStub;
  let pathJoinStub;
  const testFilePath = '/mock/path/routes.json';

  const mockRoutes = {
    routes: [
      {
        id: '1',
        name: 'Test Route 1',
        start_location: 'Start 1',
        end_location: 'End 1',
        date: '2024-03-08T10:00:00.000Z'
      },
      {
        id: '2',
        name: 'Test Route 2',
        start_location: 'Start 2',
        end_location: 'End 2',
        date: '2024-03-08T11:00:00.000Z'
      }
    ]
  };

  before(() => {
    // Setup stubs
    fsReadStub = sinon.stub(fs, 'readFile');
    fsWriteStub = sinon.stub(fs, 'writeFile');
    fsMkdirStub = sinon.stub(fs, 'mkdir');
    pathJoinStub = sinon.stub(path, 'join').returns(testFilePath);

    // Default stub behaviors
    fsReadStub.resolves(JSON.stringify(mockRoutes));
    fsWriteStub.resolves();
    fsMkdirStub.resolves();
  });

  after(() => {
    sinon.restore();
  });

  describe('GET /api/routes', () => {
    it('should return all routes', (done) => {
      chai
        .request(app)
        .get('/api/routes')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          expect(res.body).to.have.lengthOf(2);
          expect(res.body[0]).to.have.property('id', '1');
          expect(fsReadStub.calledWith(testFilePath, 'utf8')).to.be.true;
          done();
        });
    });

    it('should return empty array when file does not exist', (done) => {
      fsReadStub.rejects({ code: 'ENOENT' });
      
      chai
        .request(app)
        .get('/api/routes')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array').that.is.empty;
          done();
        });
    });

    it('should handle server errors', (done) => {
      fsReadStub.rejects(new Error('Read error'));
      
      chai
        .request(app)
        .get('/api/routes')
        .end((err, res) => {
          expect(res).to.have.status(500);
          expect(res.body).to.have.property('error', 'Failed to get routes');
          done();
        });
    });
  });

  describe('POST /api/routes', () => {
    let consoleStub;

    beforeEach(() => {
      consoleStub = sinon.stub(console, 'log');
    });

    afterEach(() => {
      consoleStub.restore();
    });

    it('should create new route successfully', (done) => {
      const newRoute = {
        name: 'New Route',
        start_location: 'Start Location',
        end_location: 'End Location'
      };

      chai
        .request(app)
        .post('/api/routes')
        .send(newRoute)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.include(newRoute);
          expect(res.body).to.have.property('id');
          expect(res.body).to.have.property('date');
          expect(fsMkdirStub.called).to.be.true;
          expect(fsWriteStub.called).to.be.true;
          expect(consoleStub.calledWith('Route saved successfully:')).to.be.true;
          done();
        });
    });

    it('should handle write errors', (done) => {
      const consoleErrorStub = sinon.stub(console, 'error');
      fsWriteStub.rejects(new Error('Write error'));

      chai
        .request(app)
        .post('/api/routes')
        .send({ name: 'Test Route' })
        .end((err, res) => {
          expect(res).to.have.status(500);
          expect(res.body).to.have.property('error', 'Failed to save route');
          expect(consoleErrorStub.calledWith('Error saving route:')).to.be.true;
          consoleErrorStub.restore();
          done();
        });
    });
  });

  describe('DELETE /api/routes/:id', () => {
    let consoleStub;

    beforeEach(() => {
      consoleStub = sinon.stub(console, 'log');
    });

    afterEach(() => {
      consoleStub.restore();
    });

    it('should delete existing route', (done) => {
      chai
        .request(app)
        .delete('/api/routes/1')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message', 'Route deleted successfully');
          expect(fsWriteStub.called).to.be.true;
          expect(consoleStub.calledWith('Route deleted successfully:')).to.be.true;
          done();
        });
    });

    it('should return 404 for non-existent route', (done) => {
      chai
        .request(app)
        .delete('/api/routes/999')
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('error', 'Route not found');
          expect(consoleStub.calledWith('Route not found:')).to.be.true;
          done();
        });
    });

    it('should handle delete errors', (done) => {
      const consoleErrorStub = sinon.stub(console, 'error');
      fsWriteStub.rejects(new Error('Delete error'));

      chai
        .request(app)
        .delete('/api/routes/1')
        .end((err, res) => {
          expect(res).to.have.status(500);
          expect(res.body).to.have.property('error', 'Failed to delete route');
          expect(consoleErrorStub.calledWith('Error deleting route:')).to.be.true;
          consoleErrorStub.restore();
          done();
        });
    });
  });

  describe('File Operations', () => {
    let consoleErrorStub;

    beforeEach(() => {
      consoleErrorStub = sinon.stub(console, 'error');
    });

    afterEach(() => {
      consoleErrorStub.restore();
    });

    it('should handle file system errors properly', (done) => {
      fsMkdirStub.rejects(new Error('Permission denied'));

      chai
        .request(app)
        .post('/api/routes')
        .send({ name: 'Test Route' })
        .end((err, res) => {
          expect(consoleErrorStub.called).to.be.true;
          expect(consoleErrorStub.firstCall.args[0]).to.include('Error');
          expect(res).to.have.status(500);
          done();
        });
    });

    it('should handle invalid JSON data', (done) => {
      fsReadStub.resolves('invalid json');

      chai
        .request(app)
        .get('/api/routes')
        .end((err, res) => {
          expect(res).to.have.status(500);
          expect(res.body).to.have.property('error', 'Failed to get routes');
          expect(consoleErrorStub.called).to.be.true;
          done();
        });
    });
  });
});