using System;

namespace RedRock.Calendar.Modules.Finance.Contract
{
    public class FinanceDTO
    {
        public Guid UserReference { get; set; }
        public int Sum { get; set; }
        public int Month { get; set; }
        public int EventsNumber { get; set; }
        public int Price { get; set; }
    }
}
