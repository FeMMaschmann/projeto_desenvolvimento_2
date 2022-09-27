import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Menu from "./Menu";

export default function Register() {
  return (
    <>
      <Menu />
      <div className="container">
        <h1 className="my-h1">Cadastro</h1>
        <div className="my-form">
          <Form>
            <Form.Group className="mb-3 row">
              <div className="col-sm">
                <Form.Label>Nome</Form.Label>
                <Form.Control type="text" placeholder="Digite seu nome" />
              </div>
              <div className="col-sm">
                <Form.Label>Sobrenome</Form.Label>
                <Form.Control type="text" placeholder="Digite seu sobrenome" />
              </div>
            </Form.Group>
            <Form.Group className="mb-3 row">
              <div className="col-sm">
                <Form.Label>E-mail</Form.Label>
                <Form.Control type="email" placeholder="Digite seu e-mail" />
              </div>
            </Form.Group>
            <Form.Group className="mb-3 row">
              <div className="col-sm">
                <Form.Label>Senha</Form.Label>
                <Form.Control type="password" placeholder="Digite sua senha" />
              </div>
              <div className="col-sm">
                <Form.Label>Repetir senha</Form.Label>
                <Form.Control type="password" placeholder="Repita sua senha" />
              </div>
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
}
