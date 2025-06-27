import { type NextRequest, NextResponse } from 'next/server';

// Simulação de uma base de dados de utilizadores
const users = {
  cliente: [{ email: 'cliente@example.com', password: 'password123' }],
  especialista: [{ email: 'especialista@example.com', password: 'password123' }],
  afiliado: [{ email: 'afiliado@example.com', password: 'password123' }],
  admin: [{ email: 'edibizmz@gmail.com', password: 'Sarent0305' }], // Manter o admin por agora
};

export async function POST(request: NextRequest) {
  try {
    const { email, password, tipoUsuario } = await request.json();

    if (!email || !password || !tipoUsuario) {
      return NextResponse.json({ success: false, error: 'Email, senha e tipo de utilizador são obrigatórios.' }, { status: 400 });
    }

    const userList = users[tipoUsuario as keyof typeof users];
    if (!userList) {
      return NextResponse.json({ success: false, error: 'Tipo de utilizador inválido.' }, { status: 400 });
    }

    const user = userList.find((u) => u.email === email && u.password === password);

    if (user) {
      // Em um cenário real, você geraria um token JWT aqui
      return NextResponse.json({ success: true, message: 'Login bem-sucedido!' });
    } else {
      return NextResponse.json({ success: false, error: 'Email ou senha inválidos.' }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Ocorreu um erro no servidor.' }, { status: 500 });
  }
}