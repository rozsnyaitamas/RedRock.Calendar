using System;
using System.Collections.Generic;
using System.Text;

namespace RedRock.Calendar.Modules.Finance.Business.PaymentStrategy
{
    public interface IPaymentStrategy
    {
        public int GetPrice();
    }
}
