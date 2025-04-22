import React from 'react';

function Contact() {
  return (
    <div className="container py-5 " style={{ minHeight: '100vh' }}>
      <div className="row mb-5 text-center">
        <div className="col">
          <h1 className="display-5 fw-bold text-primary">Contactez-nous</h1>
          <p className="text-muted">
            Une question, une suggestion ou besoin d’aide ? N'hésitez pas à nous écrire.
          </p>
        </div>
      </div>

      <div className="row g-5 mb-5 row justify-content-center">
        {/* Formulaire de contact */}
        <div className="col-md-7">
          <div className="card shadow-lg p-4 border-0 rounded-4">
            <form>
              <div className="mb-3">
                <label className="form-label fw-semibold">Nom complet</label>
                <input type="text" className="form-control form-control-lg" placeholder="Votre nom" required />
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold">Adresse email</label>
                <input type="email" className="form-control form-control-lg" placeholder="email@example.com" required />
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold">Sujet</label>
                <input type="text" className="form-control form-control-lg" placeholder="Sujet de votre message" />
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold">Message</label>
                <textarea className="form-control form-control-lg" rows="5" placeholder="Écrivez votre message ici..." required></textarea>
              </div>
              <button type="submit" className="btn btn-primary btn-lg w-100">Envoyer le message</button>
            </form>
          </div>
        </div>

        {/* Infos de contact */}
        {/* <div className="col-md-5">
          <div className="card bg-light shadow-sm border-0 rounded-4 p-4 h-100">
            <h5 className="fw-bold mb-3">Nos coordonnées</h5>
            <p className="mb-2">
              <strong>Adresse :</strong> 12 Rue de l'Éducation, 75000 Paris, France
            </p>
            <p className="mb-2">
              <strong>Email :</strong> contact@studyzone.fr
            </p>
            <p className="mb-2">
              <strong>Téléphone :</strong> +33 1 23 45 67 89
            </p>
            <p className="text-muted mt-4">
              Nous répondons généralement sous 24 heures.
            </p>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default Contact;
