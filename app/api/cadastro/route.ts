import { type NextRequest, NextResponse } from 'next/server';

// Simulação de uma base de dados de utilizadores
const users: { [key: string]: any[] } = {
  cliente: [],
  especialista: [],
  afiliado: [],
  admin: [],
};

export async function POST(request: NextRequest) {
  try {
    const { nome, email, password, tipo, telefone } = await request.json();

    if (!nome || !email || !password || !tipo) {
      return NextResponse.json({ success: false, error: 'Todos os campos obrigatórios devem ser preenchidos.' }, { status: 400 });
    }

    // Validação para tipos que exigem telefone
    if (['especialista', 'afiliado', 'admin'].includes(tipo) && !telefone) {
        return NextResponse.json({ success: false, error: 'O telefone é obrigatório para este tipo de conta.' }, { status: 400 });
    }

    // Impede o registo de um admin que não seja o principal
    if (tipo === 'admin' && email.toLowerCase() !== 'edibizmz@gmail.com') {
        return NextResponse.json({ success: false, error: 'Não é permitido registar uma conta de administrador.' }, { status: 403 });
    }

    const userList = users[tipo as keyof typeof users];
    if (!userList) {
      return NextResponse.json({ success: false, error: 'Tipo de utilizador inválido.' }, { status: 400 });
    }

    const existingUser = Object.values(users).flat().some(u => u.email === email);
    if (existingUser) {
      return NextResponse.json({ success: false, error: 'Este email já está a ser utilizado.' }, { status: 409 });
    }

    // Em um cenário real, a senha seria "hasheada" aqui
    const newUser = { id: Date.now().toString(), nome, email, password, telefone };
    userList.push(newUser);

    console.log('Utilizadores registados:', users);

    return NextResponse.json({ success: true, message: 'Utilizador registado com sucesso!' });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Ocorreu um erro no servidor.' }, { status: 500 });
  }
}