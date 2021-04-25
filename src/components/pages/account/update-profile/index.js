import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert, Container } from "react-bootstrap"
import { Link, useHistory } from "react-router-dom"
import { useAuth } from "../../../../config/contexts/auth-context"

export default function UpdateProfile() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { currentUser, updatePassword, updateEmail } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    function handleSubmit(e) {
        e.preventDefault()
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match")
        }

        const promises = []
        setLoading(true)
        setError("")

        if (emailRef.current.value !== currentUser.email) {
            promises.push(updateEmail(emailRef.current.value))
        }
        if (passwordRef.current.value) {
            promises.push(updatePassword(passwordRef.current.value))
        }

        Promise.all(promises)
            .then(() => {
                history.push("/")
            })
            .catch(() => {
                setError("Failed to update account")
            })
            .finally(() => {
                setLoading(false)
            })
    }

    return (
        <Container className='d-flex align-items-center justify-content-center' style={{ minHeight: '100vh' }}>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Đổi mật khẩu</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                ref={emailRef}
                                required
                                defaultValue={currentUser.email}
                            />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Mật khẩu</Form.Label>
                            <Form.Control
                                type="password"
                                ref={passwordRef}
                            />
                        </Form.Group>
                        <Form.Group id="password-confirm">
                            <Form.Label>Xác nhận mật khẩu</Form.Label>
                            <Form.Control
                                type="password"
                                ref={passwordConfirmRef}
                            />
                        </Form.Group>
                        <Button disabled={loading} className="w-100" type="submit">Đổi</Button>
                    </Form>
                </Card.Body>
                <div className="w-100 text-center mt-2 mb-2">
                    <Link to="/">Cancel</Link>
                </div>
            </Card>
        </Container>
    )
}