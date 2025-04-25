import React, { useState } from 'react';
import 'animate.css';

function Contact() {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    sujet: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    setFormData({
      nom: '',
      email: '',
      sujet: '',
      message: '',
    });

    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  return (
    <>
      {/* Style intégré directement */}
      <style>{`
        .blurred-container {
          filter: blur(6px);
          pointer-events: none;
          user-select: none;
        }

        .confirmation-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.8); /* fond noir transparent */
          z-index: 9999;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .confirmation-message {
          background: #ffffff;
          padding: 40px 50px;
          border-radius: 20px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.25);
          font-size: 1.3rem;
          font-weight: bold;
          color: #198754;
          text-align: center;
          max-width: 600px;
        }
      `}</style>

      {/* Message de confirmation au centre */}
      {submitted && (
        <div className="confirmation-overlay">
          <div className="confirmation-message animate__animated animate__zoomIn">
            Merci ! Votre message a bien été envoyé. Nous vous répondrons rapidement.
          </div>
        </div>
      )}

      {/* Contenu flouté si submitted */}
      <div className={`container py-5 ${submitted ? 'blurred-container' : ''}`} style={{ minHeight: '100vh' }}>
        <div className="row mb-5 text-center">
          <div className="col">
            <h1 className="display-5 fw-bold text-primary">Contactez-nous</h1>
            <p className="text-muted">
              Une question, une suggestion ou besoin d’aide ? N'hésitez pas à nous écrire.
            </p>
          </div>
        </div>

        <div className="row g-5 mb-5 justify-content-center">
          <div className="col-md-7">
            <div className="card shadow-lg p-4 border-0 rounded-4">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Nom complet</label>
                  <input
                    type="text"
                    name="nom"
                    value={formData.nom}
                    onChange={handleChange}
                    className="form-control form-control-lg"
                    placeholder="Votre nom"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Adresse email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-control form-control-lg"
                    placeholder="email@example.com"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Sujet</label>
                  <input
                    type="text"
                    name="sujet"
                    value={formData.sujet}
                    onChange={handleChange}
                    className="form-control form-control-lg"
                    placeholder="Sujet de votre message"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="form-control form-control-lg"
                    rows="5"
                    placeholder="Écrivez votre message ici..."
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary btn-lg w-100">
                  Envoyer le message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;
