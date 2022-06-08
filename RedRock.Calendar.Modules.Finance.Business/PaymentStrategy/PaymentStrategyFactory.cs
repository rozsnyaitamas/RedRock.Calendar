using RedRock.Calendar.Modules.Users.Contract;

namespace RedRock.Calendar.Modules.Finance.Business.PaymentStrategy
{
    public static class PaymentStrategyFactory
    {

        public static IPaymentStrategy GetPaymentStrategy(UserRole role)
        {
            switch (role)
            {
                case UserRole.PropertyOwner:
                    {
                        return new PropertyOwnerPaymentStrategy();
                    }
                case UserRole.StandardUser:
                    {
                        return new StandardUserPaymentStrategy();
                    }
                case UserRole.SupporterUser:
                    {
                        return new SupporterUserPaymentStrategy();
                    }
                default:
                    {
                        return new StandardUserPaymentStrategy(); //TODO implement in case of default!!
                    }
            }
        }
    }
}
