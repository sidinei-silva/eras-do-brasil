using Eras.Core.Dice;

namespace Eras.Client
{
    public class Dice
    {
        private Rng _rng;

        public Dice(ulong seed) => _rng = new Rng(seed, 0);

        public int Roll(int sides)
        {
            var (value, next) = _rng.Roll(sides);
            _rng = next;
            return value;
        }
    }
}