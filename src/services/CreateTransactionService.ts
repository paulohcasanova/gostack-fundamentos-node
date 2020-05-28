import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request{
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    // TODO
    if (type === 'outcome') {
      if(this.transactionsRepository.getBalance().total < value) {
        throw Error('Value exceeded the income value.');
      }
    }

    if (!(type === 'outcome' || type === 'income')){
      throw Error('Invalid input type.');
    }

    const transaction = this.transactionsRepository.create({
      title, 
      value, 
      type,
    });

    return transaction;
  }
}

export default CreateTransactionService;
