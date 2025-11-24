using CourseBookingApp.Api.src.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;

namespace CourseBookingApp.Api.src.Data.Interceptors;

public class TimeStampInterceptor: SaveChangesInterceptor
{
  public override ValueTask<InterceptionResult<int>> SavingChangesAsync
  (
    DbContextEventData dbContextEventData,
    InterceptionResult<int> interceptionResult,
    CancellationToken cancellationToken = default
  )
  {
    var context = dbContextEventData.Context;
    if (context == null)
    {
      return base.SavingChangesAsync(dbContextEventData, interceptionResult, cancellationToken);
    }
    
    var entries = context.ChangeTracker
      .Entries<BaseEntity>()
      .Where(e => e.State == EntityState.Added || e.State == EntityState.Modified);

    var now = DateTime.UtcNow;

    foreach (var entry in entries)
    {
      if (entry.State == EntityState.Added && entry.Entity.Created == default)
      {
        entry.Entity.Created = now;
      }
      entry.Entity.Modified = now;
    }
    return base.SavingChangesAsync(dbContextEventData, interceptionResult, cancellationToken);

  }
}
