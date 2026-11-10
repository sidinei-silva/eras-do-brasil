
namespace Eras.Core.Dice
{
    /*
        Os dados no game é representado por um número inteiro.
        A rolagem de dados é de maneira determinística, ou seja, o resultado da rolagem é sempre o mesmo para uma seed de rolagem e mesmo counter
        A cada rolagem deste dado é incrementado o counter, para que a próxima rolagem seja diferente.
    */
    public readonly struct Rng
    {
        public readonly ulong Seed;
        public readonly ulong Counter;

        public Rng(ulong seed, ulong counter)
        {
            Seed = seed;
            Counter = counter;
        }

        public (int value, Rng next) Roll(int sides)
        {   
            ulong randomGenerator = SplitMix64.Next(Seed, Counter);
            int value = (int)(randomGenerator % (ulong)sides) + 1;
            return (value, new Rng(Seed, Counter + 1));
        }
    }
}
