import express from 'express';
import cors from 'cors';
import { SubscriptionPlan } from './src/app/services/mercado-pago.service';

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Dados mockados dos planos
const subscriptionPlans: SubscriptionPlan[] = [
    {
        id: 'basic',
        name: 'Plano Básico',
        price: 9.90,
        description: 'Ideal para começar',
        features: [
            'Até 100 QR Codes',
            'Personalização básica',
            'Suporte por email',
            'Relatórios básicos'
        ]
    },
    {
        id: 'pro',
        name: 'Plano Pro',
        price: 19.90,
        description: 'Para profissionais',
        features: [
            'QR Codes ilimitados',
            'Personalização avançada',
            'Suporte prioritário',
            'Relatórios detalhados',
            'API de integração'
        ]
    },
    {
        id: 'enterprise',
        name: 'Plano Enterprise',
        price: 49.90,
        description: 'Para grandes empresas',
        features: [
            'Todas as features do Pro',
            'Suporte 24/7',
            'SLA garantido',
            'Treinamento da equipe',
            'Integração personalizada'
        ]
    }
];

// Rotas
app.get('/api/subscription-plans', (req, res) => {
    res.json(subscriptionPlans);
});

app.post('/api/subscriptions', (req, res) => {
    const { plan_id, payment_data } = req.body;
    // Aqui você implementaria a lógica de criação de assinatura no Mercado Pago
    res.json({ message: 'Assinatura criada com sucesso', plan_id });
});

app.post('/api/payments', (req, res) => {
    const paymentData = req.body;
    // Aqui você implementaria a lógica de processamento de pagamento no Mercado Pago
    res.json({
        id: '123456789',
        status: 'approved',
        status_detail: 'accredited',
        payment_method_id: 'visa',
        payment_type_id: 'credit_card',
        transaction_amount: paymentData.amount,
        installments: paymentData.installments,
        description: 'Assinatura Gerador QR Code',
        external_reference: 'ref_123',
        date_created: new Date().toISOString()
    });
});

app.post('/api/subscriptions/:id/cancel', (req, res) => {
    const { id } = req.params;
    // Aqui você implementaria a lógica de cancelamento de assinatura no Mercado Pago
    res.json({ message: 'Assinatura cancelada com sucesso', subscription_id: id });
});

app.get('/api/subscriptions/:id/status', (req, res) => {
    const { id } = req.params;
    // Aqui você implementaria a lógica de verificação de status da assinatura no Mercado Pago
    res.json({ status: 'active', subscription_id: id });
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
}); 