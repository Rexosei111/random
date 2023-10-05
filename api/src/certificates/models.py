from datetime import datetime
from database import Base
from sqlalchemy import Column, DateTime
from sqlalchemy import Integer
from sqlalchemy import Date
from sqlalchemy import String
from sqlalchemy import Boolean
from sqlalchemy import Float
from config import get_settings
from database import Base
from database import get_async_session


class Certificate(Base):
    __tablename__ = "certificates"
    id = Column(Integer, primary_key=True, index=True)
    certificate_id = Column(String(30), unique=True, index=True)
    name_of_student = Column(String(200), index=True, nullable=False)
    programme = Column(String(200), index=True, nullable=False)
    department = Column(String(200), nullable=False)
    cwa = Column(Float, nullable=False)
    degree_classification = Column(String(200))
    year_of_completion = Column(Integer)
    index_number = Column(String(30))
    createdAt = Column(DateTime, default=datetime.utcnow)
    updatedAt = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
