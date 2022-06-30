using RedRock.Calendar.Modules.Finance.Contract;
using RedRock.Calendar.Modules.Users.Contract;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Text;

namespace RedRock.Calendar.Modules.Finance.Business
{
    public static class FeeTemplateGenerator
    {
        public static string GetFeeString(IEnumerable<FinanceDTO> financeDTOs, IEnumerable<UserDTO> users)
        {
            var sb = new StringBuilder();
            sb.Append(@"This is the generated PDF report!!!
                        ");
            var overall = 0;
            foreach (var finance in financeDTOs)
            {
                var userName = GetUserNameById(finance.UserReference, users);
                var monthName = new DateTime(2010, finance.Month, 1)
                                        .ToString("MMM", CultureInfo.InvariantCulture);
                overall += finance.Sum;
                sb.AppendFormat("\n");
                sb.AppendFormat(@"---------------------------------");
                sb.AppendFormat("\n");
                sb.AppendFormat(@"Name: {0}", userName);
                sb.AppendFormat("\n");
                sb.AppendFormat(@"Month: {0}", monthName);
                sb.AppendFormat("\n");
                sb.AppendFormat(@"{0}x{1} RON", finance.EventsNumber, finance.Price);
                sb.AppendFormat("\n");
                sb.AppendFormat(@"---------------------------------");
                sb.AppendFormat("\n");
                sb.AppendFormat(@"Total: {0} RON", finance.Sum);
                sb.AppendFormat("\n");
                sb.AppendFormat(@"---------------------------------");
                sb.AppendFormat("\n");
                sb.AppendFormat("\n");

            }
            sb.AppendFormat(@"Overall {0} RON",overall);
            return sb.ToString();
        }

        private static string GetUserNameById(Guid id, IEnumerable<UserDTO> users)
        {
            foreach (var user in users)
            {
                if (user.Id.Equals(id)) return user.FullName;
            }
            return null;
        }
    }
}
