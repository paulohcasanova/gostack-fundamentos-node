import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransaction {
  title: string;
  value: number;
  type: 'income' | 'outcome'
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getIncome(): number {
    return this.transactions
                .filter(({ type }) => type === 'income')
                .reduce((sum, record) => sum + record.value, 0);
  }

  public getOutcome(): number {
    return this.transactions
                .filter(({ type }) => type === 'outcome')
                .reduce((sum, record) => sum + record.value, 0);
  }

  public getBalance(): Balance {
    const income = this.getIncome();
    const outcome = this.getOutcome();

    const balance: Balance = {
      income,
      outcome,
      total: income - outcome,
    };

    return balance;
  }

  public create({ title, value, type }: CreateTransaction): Transaction {
    const transaction = new Transaction({ 
      title, 
      value, 
      type 
    });

    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
